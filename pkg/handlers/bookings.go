package handlers

import (
	"cine-spot/pkg/database"
	"cine-spot/pkg/models"
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

// ConfirmBookingHandler handles booking confirmations
func ConfirmBookingHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	screeningID, user, bookedSeats, err := extractBookingBody(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	screeningRepo, cleanup, err := models.ScreeningRepo()
	if err != nil {
		fmt.Println("Error getting screening repository:", err)
		http.Error(w, "Error getting screening repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	objectID, err := database.ObjectId(screeningID)
	if err != nil {
		fmt.Println("Error converting screening_id to ObjectID:", err)
		http.Error(w, "Invalid screening ID", http.StatusBadRequest)
		return
	}

	screening, err := screeningRepo.FindOne(ctx, bson.D{{Key: "_id", Value: objectID}})
	if err != nil {
		fmt.Println("Failed to get screening seating plan:", err)
		http.Error(w, "Failed to get screening seating plan", http.StatusInternalServerError)
		return
	}

	bookedSeatsList := []models.Seat{}
	for _, seat := range bookedSeats {
		for i, screeningSeat := range screening.Seats {
			if seat.Row == screeningSeat.Row && seat.Number == screeningSeat.Number {
				if !screening.Seats[i].Available {
					fmt.Println("Error: one or more seats are not available")
					http.Error(w, "one or more seats are not available", http.StatusBadRequest)
					return
				}
				screening.Seats[i].Available = false
				bookedSeatsList = append(bookedSeatsList, screening.Seats[i])
			}
		}
	}

	bookingRepo, cleanup, err := models.BookingRepo()
	if err != nil {
		fmt.Println("Error getting booking repository:", err)
		http.Error(w, "Error getting booking repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	new_booking, user_exists, err := parseBooking(ctx, user, bookedSeatsList, screening, bookingRepo)
	if err != nil {
		fmt.Println("Error parsing booking:", err)
		http.Error(w, "Error parsing booking", http.StatusInternalServerError)
		return
	}

	if user_exists {
		booking_object_id, err := database.ObjectId(new_booking.ID)
		if err != nil {
			fmt.Println("Error converting booking_id to ObjectID:", err)
			http.Error(w, "Invalid booking ID", http.StatusBadRequest)
			return
		}

		// Marshal new_booking to BSON
		updateData, err := bson.Marshal(new_booking)
		if err != nil {
			fmt.Println("Error marshaling booking:", err)
			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}

		// Unmarshal into a BSON map
		var updateMap bson.M
		if err := bson.Unmarshal(updateData, &updateMap); err != nil {
			fmt.Println("Error unmarshaling booking to map:", err)
			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}

		// Remove the _id field as it is immutable
		delete(updateMap, "_id")

		updateCount, err := bookingRepo.UpdateOne(ctx,
			bson.D{{Key: "_id", Value: booking_object_id}},
			bson.D{{Key: "$set", Value: updateMap}},
		)
		if updateCount != 1 {
			fmt.Println("Error updating booking:", err)
			http.Error(w, "Error updating booking", http.StatusInternalServerError)
			return
		}
	} else {
		// Create a new booking
		_, err = bookingRepo.InsertOne(ctx, new_booking)
	}
	if err != nil {
		fmt.Println("Error inserting booking:", err)
		http.Error(w, "Error inserting booking", http.StatusInternalServerError)
		return
	}

	modifiedCount, err := screeningRepo.UpdateOne(ctx, bson.D{{Key: "_id", Value: objectID}},
		bson.D{{Key: "$set", Value: bson.D{{Key: "seats", Value: screening.Seats}}}})
	if err != nil || modifiedCount != 1 {
		fmt.Println("Failed to update screening seating plan: \nmodified count:", modifiedCount, "\nerr:", err)
		http.Error(w, "Failed to update screening seating plan", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{"message": "Booking confirmed"})
}

func GetBookingsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	queries := r.URL.Query()

	user_name := queries.Get("name")
	if user_name == "" {
		http.Error(w, "name query parameter is required", http.StatusBadRequest)
		return
	}
	user_email := queries.Get("email")
	if user_email == "" {
		http.Error(w, "email query parameter is required", http.StatusBadRequest)
		return
	}
	user_phone := queries.Get("phone")
	if user_phone == "" {
		http.Error(w, "phone query parameter is required", http.StatusBadRequest)
		return
	}

	booking_repo, cleanup, err := models.BookingRepo()
	if err != nil {
		fmt.Println("Error getting booking repository:", err)
		http.Error(w, "Error getting booking repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	user_bookings, err := booking_repo.FindOne(ctx, bson.D{
		{Key: "name", Value: user_name},
		{Key: "email", Value: user_email},
		{Key: "phone", Value: user_phone},
	})
	if err != nil {
		fmt.Println("Error getting bookings:", err)
		http.Error(w, "Error getting bookings", http.StatusInternalServerError)
		return
	}

	fmt.Println("User Bookings:", user_bookings.Bookings)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user_bookings.Bookings)
}
