package models

import (
	"cine-spot/pkg/repository"
)

type SeatType string

const (
	Regular SeatType = "Regular"
	VIP     SeatType = "VIP"
	Premium SeatType = "Premium"
)

// Seat represents seat types and prices in a screening per seat.
type Seat struct {
	ID        string   `bson:"_id,omitempty" json:"_id,omitempty"`
	Price     float32  `bson:"price" json:"price"`
	Type      SeatType `bson:"type" json:"type"`
	Row       int      `bson:"row" json:"row"`
	Number    int      `bson:"number" json:"number"`
	Available bool     `bson:"available" json:"available"`
}

type Screening struct {
	ID      string `bson:"_id,omitempty" json:"_id,omitempty"`
	MovieID string `bson:"movieId" json:"movieId"`
	Time    string `bson:"time" json:"time"`
	Seats   []Seat `bson:"seats" json:"seats"`
}

func DefaultScreening() Screening {
	var theaterSetup []struct {
		Row    int
		Number int
	}

	for i := 0; i < 11; i++ {
		var places_in_row int
		if i < 8 {
			places_in_row = 7
		} else {
			places_in_row = 11
		}

		for j := 0; j < places_in_row; j++ {
			theaterSetup = append(theaterSetup, struct {
				Row    int
				Number int
			}{Row: i + 1, Number: j + 1})
		}
	}

	var seats []Seat

	for _, place := range theaterSetup {
		seat := DefaultSeat()
		seat.Row = place.Row
		seat.Number = place.Number
		if seat.Row >= 8 {
			seat.Price = 15.0
			seat.Type = VIP
		}
		seats = append(seats, seat)
	}

	return Screening{
		MovieID: "default_movie_id",
		Time:    "2023-01-01T00:00:00Z",
		Seats:   seats,
	}
}

func DefaultSeat() Seat {
	return Seat{
		Price:     10.0,
		Type:      "Regular",
		Row:       1,
		Number:    1,
		Available: true,
	}
}

func ScreeningRepo() (*repository.Repository[Screening], func(), error) {
	return repository.Repo[Screening]("screenings")
}

// func SeatRepo() (*repository.Repository[Seat], func(), error) {
// 	return repository.Repo[Seat]("seats")
// }
