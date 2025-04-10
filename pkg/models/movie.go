package models

import (
	"movie_theater/pkg/repository"
)

// Movie represents the structure for a movie document.
type Movie struct {
	ID          string   `bson:"_id,omitempty" json:"_id,omitempty"`
	Title       string   `bson:"title" json:"title"`
	ImageURL    string   `bson:"imageUrl" json:"imageUrl"`
	ReleaseDate string   `bson:"releaseDate" json:"releaseDate"`
	Overview    string   `bson:"overview" json:"overview"`
	Rating      string   `bson:"rating" json:"rating"`
	Genre       string   `bson:"genre" json:"genre"`
	Director    string   `bson:"director" json:"director"`
	Cast        string   `bson:"cast" json:"cast"`
	TrailerURL  string   `bson:"trailerUrl" json:"trailerUrl"`
	WatchURL    string   `bson:"watchUrl" json:"watchUrl"`
	Reviews     []string `bson:"reviews" json:"reviews"`
	Duration    string   `bson:"duration" json:"duration"`
	Language    string   `bson:"language" json:"language"`
}

func Default() Movie {
	return Movie{
		Title:       "Default Movie",
		ImageURL:    "https://example.com/default.jpg",
		ReleaseDate: "0000-01-01",
		Overview:    "This is a default movie overview.",
		Rating:      "0.0",
		Genre:       "Drama",
		Director:    "Default Director",
		Cast:        "Default Cast",
		TrailerURL:  "https://example.com/default_trailer.mp4",
		WatchURL:    "https://example.com/default_watch.mp4",
		Reviews:     []string{"No reviews yet."},
		Duration:    "2h 0m",
		Language:    "English",
	}
}

func MovieRepo() (*repository.Repository[Movie], func(), error) {
	return repository.Repo[Movie]("movies")
}
