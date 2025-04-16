package models

import (
	"cine-spot/pkg/repository"
)

type Booking struct {
	ID       string      `bson:"_id,omitempty" json:"_id,omitempty"`
	Name     string      `bson:"name" json:"name"`
	Email    string      `bson:"email" json:"email"`
	Phone    string      `bson:"phone" json:"phone"`
	Bookings []Screening `bson:"bookings" json:"bookings"`
}

func DefaultBooking() Booking {
	return Booking{
		Name:     "",
		Email:    "",
		Phone:    "",
		Bookings: []Screening{DefaultScreening()},
	}
}

func BookingRepo() (*repository.Repository[Booking], func(), error) {
	return repository.Repo[Booking]("bookings")
}
