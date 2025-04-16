package handlers

import (
	"cine-spot/pkg/models"
	"cine-spot/pkg/repository"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserData struct {
	Email string `json:"email"`
	Name  string `json:"name"`
	Phone string `json:"phone"`
}
type SeatShort struct {
	Row    int `json:"row"`
	Number int `json:"number"`
}

type BookingRequest struct {
	ScreeningId string      `json:"screeningId"`
	User        UserData    `json:"user"`
	Seats       []SeatShort `json:"seats"`
}

func extractBookingBody(r *http.Request) (string, UserData, []SeatShort, error) {
	var r_body BookingRequest
	err := json.NewDecoder(r.Body).Decode(&r_body)
	if err != nil {
		fmt.Println("Error decoding booked seats:", err)
		return "", UserData{}, nil, err
	}

	screening_id, booked_seats, user := r_body.ScreeningId, r_body.Seats, r_body.User
	if user.Email == "" {
		fmt.Println("Error: missing 'email' in request body")
		return "", UserData{}, nil, fmt.Errorf("missing 'email' in request body")
	}
	if user.Name == "" {
		fmt.Println("Error: missing 'name' in request body")
		return "", UserData{}, nil, fmt.Errorf("missing 'name' in request body")
	}
	if user.Phone == "" {
		fmt.Println("Error: missing 'phone' in request body")
		return "", UserData{}, nil, fmt.Errorf("missing 'phone' in request body")
	}
	if screening_id == "" {
		fmt.Println("Error: missing 'screeningId' in request body")
		return "", UserData{}, nil, fmt.Errorf("missing 'screeningId' in request body")
	}
	if len(booked_seats) == 0 {
		fmt.Println("Error: missing 'seats' in request body")
		return "", UserData{}, nil, fmt.Errorf("missing 'seats' in request body")
	}

	return screening_id, user, booked_seats, nil
}

func parseNumberQueryParam(queries url.Values, param string) (int, error) {
	param_str := queries.Get(param)
	if param_str == "" {
		return 0, fmt.Errorf("missing '%s' query parameter", param)
	}
	param_int, err := strconv.Atoi(param_str)
	if err != nil {
		return 0, fmt.Errorf("invalid '%s' query parameter: %v", param, err)
	}
	return param_int, nil
}

func parseBooking(
	ctx context.Context,
	user UserData,
	bookedSeats []models.Seat,
	screening models.Screening,
	booking_repo *repository.Repository[models.Booking],
) (models.Booking, bool, error) {

	user_bookings, err := booking_repo.FindOne(ctx, bson.D{
		{Key: "name", Value: user.Name},
		{Key: "email", Value: user.Email},
		{Key: "phone", Value: user.Phone},
	})
	if err != nil {
		if err != mongo.ErrNoDocuments {
			fmt.Println("Error getting booking repository:", err)
			return models.Booking{}, false, err
		}

		// Create a new booking if one doesn't exist.
		newBooking := models.DefaultBooking()
		newBooking.Name = user.Name
		newBooking.Email = user.Email
		newBooking.Phone = user.Phone

		screening.Seats = bookedSeats
		newBooking.Bookings = []models.Screening{screening}

		return newBooking, false, nil
	}

	// Check if the user has already booked this screening
	booked_screenings := user_bookings.Bookings
	for i, booking := range booked_screenings {
		if booking.ID != screening.ID {
			continue
		}

		// Initialize a local variable to hold an updated slice
		updatedSeats := booking.Seats

		for _, seat := range bookedSeats {
			// Check if the seat is already booked
			for _, existing_seat := range updatedSeats {
				if seat.Row == existing_seat.Row && seat.Number == existing_seat.Number {
					fmt.Println("Error: one or more seats are already booked")
					return models.Booking{}, true, fmt.Errorf("one or more seats are already booked")
				}
			}
			// Append to the local accumulator so that subsequent iterations include all previous seats
			updatedSeats = append(updatedSeats, seat)
		}

		// Now assign back the accumulated result into the booked_screenings slice
		booked_screenings[i].Seats = updatedSeats
		return user_bookings, true, nil
	}

	// User has not booked this screening yet
	// Modify the screening to contain only the booked seats
	screening.Seats = bookedSeats
	booked_screenings = append(booked_screenings, screening)
	user_bookings.Bookings = booked_screenings

	return user_bookings, true, nil
}
