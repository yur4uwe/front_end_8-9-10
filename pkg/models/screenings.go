package models

import (
	"cine-spot/pkg/repository"
)

// Seat represents seat types and prices in a screening per seat.
type Seat struct {
	ID        string  `bson:"_id,omitempty" json:"_id,omitempty"`
	Price     float32 `bson:"price" json:"price"`
	Type      string  `bson:"type" json:"type"`
	Row       int     `bson:"row" json:"row"`
	Number    int     `bson:"number" json:"number"`
	Available bool    `bson:"available" json:"available"`
}

type Screening struct {
	ID      string `bson:"_id,omitempty" json:"_id,omitempty"`
	MovieID string `bson:"movieId" json:"movieId"`
	Time    string `bson:"time" json:"time"`
	Seats   []Seat `bson:"seats" json:"seats"`
}

func DefaultScreening() Screening {
	return Screening{
		MovieID: "default_movie_id",
		Time:    "2023-01-01T00:00:00Z",
		Seats:   []Seat{},
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

func SeatRepo() (*repository.Repository[Seat], func(), error) {
	return repository.Repo[Seat]("seats")
}
