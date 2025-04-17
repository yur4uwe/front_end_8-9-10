package main

import (
	"cine-spot/pkg/database"
	"cine-spot/pkg/models"
	"context"
	"fmt"
	"math/rand"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
)

func getSampleMovies() []models.Movie {
	return []models.Movie{
		{
			Title:       "Inception",
			Genre:       "Sci-Fi",
			ImageURL:    "https://m.media-amazon.com/images/I/71uKM+LdgFL._AC_UF894,1000_QL80_.jpg",
			Rating:      "8.8",
			ReleaseDate: "2010-07-16",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "The Shawshank Redemption",
			Genre:       "Drama",
			ImageURL:    "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_SY445_.jpg",
			Rating:      "9.3",
			ReleaseDate: "1994-09-23",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "The Godfather",
			Genre:       "Crime",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg",
			Rating:      "9.2",
			ReleaseDate: "1972-03-24",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "The Dark Knight",
			Genre:       "Action",
			ImageURL:    "https://m.media-amazon.com/images/I/A1exRxgHRRL.jpg",
			Rating:      "9.0",
			ReleaseDate: "2008-07-18",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "Forrest Gump",
			Genre:       "Drama",
			ImageURL:    "https://m.media-amazon.com/images/I/613ZgTigTpL._AC_UF894,1000_QL80_.jpg",
			Rating:      "8.8",
			ReleaseDate: "1994-07-06",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "Interstellar",
			Genre:       "Sci-Fi",
			ImageURL:    "https://m.media-amazon.com/images/I/71JC2qvPx5L._AC_UF894,1000_QL80_.jpg",
			Rating:      "8.6",
			ReleaseDate: "2014-11-07",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "Parasite",
			Genre:       "Thriller",
			ImageURL:    "https://assets.mubicdn.net/images/notebook/post_images/29833/images-w1400.jpg?1579571205",
			Rating:      "8.5",
			ReleaseDate: "2019-11-08",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "Pulp Fiction",
			Genre:       "Crime",
			ImageURL:    "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
			Rating:      "8.9",
			ReleaseDate: "1994-10-14",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "The Matrix",
			Genre:       "Sci-Fi",
			ImageURL:    "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
			Rating:      "8.7",
			ReleaseDate: "1999-03-31",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
		{
			Title:       "Fight Club",
			Genre:       "Drama",
			ImageURL:    "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
			Rating:      "8.8",
			ReleaseDate: "1999-10-15",
			Overview:    "No overview available.",
			Director:    "Director unknown",
			Cast:        "Cast not listed",
			TrailerURL:  "https://example.com/default-trailer",
			WatchURL:    "https://example.com/default-watch",
			Duration:    "120 minutes",
			Language:    "English",
		},
	}
}

func insertMovies() {
	movies := getSampleMovies()

	movie_repo, movieCleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Failed to create movie repository:", err)
		return
	}
	defer movieCleanup()

	ctx := context.Background()
	insertedIDs, err := movie_repo.InsertMany(ctx, movies)
	if err != nil {
		fmt.Println("Failed to insert movies:", err)
		return
	}

	fmt.Println("Inserted movies successfully. Inserted IDs:", insertedIDs)
}

func createScreenings() {
	ctx := context.Background()

	screeningRepo, screeningCleanup, err := models.ScreeningRepo()
	if err != nil {
		fmt.Println("Error creating screening repository:", err)
		return
	}
	defer screeningCleanup()

	movieRepo, movieCleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error creating movie repository:", err)
		return
	}
	defer movieCleanup()

	movies, err := movieRepo.Find(ctx, bson.D{})
	if err != nil {
		fmt.Println("Error fetching movies:", err)
		return
	}

	for _, movie := range movies {
		screening := models.DefaultScreening()
		screening.MovieID = movie.ID
		screening.Time = time.Now().Add(time.Hour * 24).Format(time.RFC3339) // Example time
		insertedID, err := screeningRepo.InsertOne(ctx, screening)
		if err != nil {
			fmt.Println("Error inserting screening for movie", movie.Title, ":", err)
			continue
		}
		fmt.Println("Inserted screening for movie", movie.Title, "with ID:", insertedID)
	}
}

func ensureMovieReviews() {
	ctx := context.Background()

	movieRepo, movieCleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error creating movie repository:", err)
		return
	}
	defer movieCleanup()

	movies, err := movieRepo.Find(ctx, bson.D{})
	if err != nil {
		fmt.Println("Error fetching movies:", err)
		return
	}

	reviewRepo, reviewCleanup, err := models.ReviewRepo()
	if err != nil {
		fmt.Println("Error creating review repository:", err)
		return
	}
	defer reviewCleanup()

	comments := []string{
		"Amazing movie! Truly a masterpiece.",
		"Pretty good entertainment overall.",
		"I didn't enjoy the story as much as expected.",
		"An average film, nothing special.",
		"Absolutely loved the cinematography!",
	}
	usernames := []string{
		"moviebuff99",
		"cinemaAddict",
		"filmcritic",
		"user123",
		"anonymous",
	}

	for _, movie := range movies {
		filter := bson.D{{Key: "movieId", Value: movie.ID}}
		existingReviews, err := reviewRepo.Find(ctx, filter)
		if err != nil {
			fmt.Println("Error fetching reviews for movie", movie.Title, ":", err)
			continue
		}

		needed := 5 - len(existingReviews)
		if needed <= 0 {
			fmt.Println("Movie", movie.Title, "already has", len(existingReviews), "reviews.")
			continue
		}

		var newReviews []models.Review
		now := time.Now().UTC().Format(time.RFC3339)
		for i := 0; i < needed; i++ {
			r := models.DefaultReview()
			r.MovieID = movie.ID
			r.Rating = float32(rand.Intn(51)) / 10.0
			r.Comment = comments[rand.Intn(len(comments))]
			r.Username = usernames[rand.Intn(len(usernames))]
			r.CreatedAt = now
			r.UpdatedAt = now
			newReviews = append(newReviews, r)
		}

		insertedIDs, err := reviewRepo.InsertMany(ctx, newReviews)
		if err != nil {
			fmt.Println("Error inserting reviews for movie", movie.Title, ":", err)
		} else {
			fmt.Println("Inserted", len(insertedIDs), "new reviews for movie", movie.Title)
		}
	}
}

func initEnv() {
	if err := godotenv.Load("../.env"); err != nil {
		fmt.Println("Error loading .env file:", err)
		return
	}
	fmt.Println("Environment variables loaded successfully")

	port := os.Getenv("APP_PORT")
	if port == "" {
		fmt.Println("PORT environment variable not set, using default port 8080")
		port = "8080"
	}
	fmt.Println("App port set to:", port)

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		fmt.Println("MONGODB_URI environment variable not set")
		return
	}
	database.SetURI(uri)
	fmt.Println("MongoDB URI set successfully")

	db_name := os.Getenv("MONGODB_DB_NAME")
	if db_name == "" {
		fmt.Println("MONGODB_DB_NAME environment variable not set")
		return
	}
	database.SetDBName(db_name)
	fmt.Println("MongoDB DB_NAME set successfully")
}

func main() {
	initEnv()

	// Example usage
	insertMovies()
	ensureMovieReviews()
	createScreenings()
}
