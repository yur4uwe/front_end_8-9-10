package models

import (
	"cine-spot/pkg/repository"
	"fmt"
)

type Review struct {
	ID        string  `bson:"_id,omitempty" json:"_id,omitempty"`
	MovieID   string  `bson:"movieId" json:"movieId"`
	Rating    float32 `bson:"rating" json:"rating"`
	Comment   string  `bson:"comment" json:"comment"`
	Username  string  `bson:"username" json:"username"`
	CreatedAt string  `bson:"createdAt" json:"createdAt"`
	UpdatedAt string  `bson:"updatedAt" json:"updatedAt"`
}

func DefaultReview() Review {
	return Review{
		MovieID:   "default_movie_id",
		Rating:    0.0,
		Comment:   "No reviews yet.",
		Username:  "Anonymous",
		CreatedAt: "0000-01-01T00:00:00Z",
		UpdatedAt: "0000-01-01T00:00:00Z",
	}
}

func ReviewRepo() (*repository.Repository[Review], func(), error) {
	return repository.Repo[Review]("reviews")
}

func (r *Review) Validate() error {
	if r.MovieID == "" {
		return fmt.Errorf("movieId is required")
	}
	if r.Rating < 0 || r.Rating > 5 {
		return fmt.Errorf("rating must be between 0 and 5")
	}
	if r.Comment == "" {
		return fmt.Errorf("comment is required")
	}
	if r.Username == "" {
		return fmt.Errorf("username is required")
	}
	return nil
}
