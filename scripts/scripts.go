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
	"go.mongodb.org/mongo-driver/mongo"
)

/**
 * @typedef {Object} MovieInfo
 * @property {string} _id - The unique identifier for the movie.
 * @property {string} title - The title of the movie.
 * @property {string} imageUrl - The URL of the movie's poster image.
 * @property {string} releaseDate - The release date of the movie.
 * @property {string} overview - A brief overview or description of the movie.
 * @property {string} rating - The rating of the movie.
 * @property {string} genre - The genre of the movie.
 * @property {string} director - The director of the movie.
 * @property {string} cast - The main cast of the movie.
 * @property {string} trailerUrl - The URL of the movie's trailer.
 * @property {string} watchUrl - The URL to watch the movie.
 * @property {string} reviews - The reviews or ratings from critics or users.
 * @property {string} duration - The duration of the movie.
 * @property {string} language - The language of the movie.
 */

func insertMovies(collection *mongo.Collection) {
	movies := []map[string]string{}

	movieInterfaces := make([]interface{}, len(movies))
	for i, movie := range movies {
		movieInterfaces[i] = movie
	}

	insert_result, err := collection.InsertMany(nil, movieInterfaces)
	if err != nil {
		fmt.Println("Failed to insert movies:", err)
		return
	}
	fmt.Println("Inserted movies successfully:", insert_result.InsertedIDs)
}

func getMovies(collection *mongo.Collection) {
	cursor, err := collection.Find(nil, bson.D{})
	if err != nil {
		fmt.Println("Failed to find movies:", err)
		return
	}
	defer cursor.Close(nil)

	if err := cursor.Err(); err != nil {
		fmt.Println("Cursor error:", err)
		return
	}

	var movies []map[string]interface{}
	if err := cursor.All(nil, &movies); err != nil {
		fmt.Println("Failed to decode movies:", err)
		return
	}

	fmt.Println("Movies found successfully:", movies)
}

func updateMovies(collection *mongo.Collection) {
	// Movies data provided; only a subset of fields is given here.
	movies := []map[string]string{
		{
			"title":       "Inception",
			"genre":       "Sci-Fi",
			"imageUrl":    "https://m.media-amazon.com/images/I/71uKM+LdgFL._AC_UF894,1000_QL80_.jpg",
			"rating":      "8.8",
			"releaseDate": "2010-07-16",
		},
		{
			"title":       "The Shawshank Redemption",
			"genre":       "Drama",
			"imageUrl":    "https://m.media-amazon.com/images/I/519NBNHX5BL._AC_SY445_.jpg",
			"rating":      "9.3",
			"releaseDate": "1994-09-23",
		},
		{
			"title":       "The Godfather",
			"genre":       "Crime",
			"imageUrl":    "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg",
			"rating":      "9.2",
			"releaseDate": "1972-03-24",
		},
		{
			"title":       "The Dark Knight",
			"genre":       "Action",
			"imageUrl":    "https://m.media-amazon.com/images/I/A1exRxgHRRL.jpg",
			"rating":      "9.0",
			"releaseDate": "2008-07-18",
		},
		{
			"title":       "Forrest Gump",
			"genre":       "Drama",
			"imageUrl":    "https://m.media-amazon.com/images/I/613ZgTigTpL._AC_UF894,1000_QL80_.jpg",
			"rating":      "8.8",
			"releaseDate": "1994-07-06",
		},
		{
			"title":       "Interstellar",
			"genre":       "Sci-Fi",
			"imageUrl":    "https://m.media-amazon.com/images/I/71JC2qvPx5L._AC_UF894,1000_QL80_.jpg",
			"rating":      "8.6",
			"releaseDate": "2014-11-07",
		},
		{
			"title":       "Parasite",
			"genre":       "Thriller",
			"imageUrl":    "https://assets.mubicdn.net/images/notebook/post_images/29833/images-w1400.jpg?1579571205",
			"rating":      "8.5",
			"releaseDate": "2019-11-08",
		},
		{
			"title":       "Pulp Fiction",
			"genre":       "Crime",
			"imageUrl":    "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
			"rating":      "8.9",
			"releaseDate": "1994-10-14",
		},
		{
			"title":       "The Matrix",
			"genre":       "Sci-Fi",
			"imageUrl":    "https://m.media-amazon.com/images/I/51EG732BV3L.jpg",
			"rating":      "8.7",
			"releaseDate": "1999-03-31",
		},
		{
			"title":       "Fight Club",
			"genre":       "Drama",
			"imageUrl":    "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
			"rating":      "8.8",
			"releaseDate": "1999-10-15",
		},
	}

	// Default values for fields missing in the movie map.
	defaultData := map[string]interface{}{
		"overview":   "No overview available.",
		"director":   "Director unknown",
		"cast":       "Cast not listed",
		"trailerUrl": "https://example.com/default-trailer",
		"watchUrl":   "https://example.com/default-watch",
		"duration":   "120 minutes",
		"language":   "English",
	}

	for _, movie := range movies {
		// Create filter based on title
		filter := bson.D{{Key: "title", Value: movie["title"]}}

		// Build update document: start with existing movie fields
		updateFields := bson.D{}
		for key, value := range movie {
			updateFields = append(updateFields, bson.E{Key: key, Value: value})
		}
		// Then, for each default field not already set in the movie map, add it.
		for key, value := range defaultData {
			if _, exists := movie[key]; !exists {
				updateFields = append(updateFields, bson.E{Key: key, Value: value})
			}
		}

		// Use $set to rewrite all fields anew
		update := bson.D{{Key: "$set", Value: updateFields}}

		updateResult, err := collection.UpdateOne(nil, filter, update)
		if err != nil {
			fmt.Println("Failed to update movie:", err)
			return
		}
		fmt.Println("Updated movie successfully:", movie["title"],
			"Matched:", updateResult.MatchedCount,
			"Modified:", updateResult.ModifiedCount)
	}
}

func ensureMovieReviews() {
	// Get the movie and review repositories.
	movieRepo, movieCleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error getting movie repository:", err)
		return
	}
	defer movieCleanup()

	reviewRepo, reviewCleanup, err := models.ReviewRepo()
	if err != nil {
		fmt.Println("Error getting review repository:", err)
		return
	}
	defer reviewCleanup()

	ctx := context.Background()

	// Fetch all movies; limit to 10 at most.
	movies, err := movieRepo.Find(ctx, bson.D{})
	if err != nil {
		fmt.Println("Error fetching movies:", err)
		return
	}
	if len(movies) > 10 {
		movies = movies[:10]
	}

	// Define sample data.
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

	// For each movie, insert random reviews until it has at least 3.
	for _, movie := range movies {
		// Assuming movie.ID is the identifier used in reviews.
		filter := bson.D{{Key: "movieId", Value: movie.ID}}
		existingReviews, err := reviewRepo.Find(ctx, filter)
		if err != nil {
			fmt.Println("Error fetching reviews for movie", movie.Title, ":", err)
			continue
		}

		needed := 3 - len(existingReviews)
		if needed <= 0 {
			fmt.Println("Movie", movie.Title, "already has", len(existingReviews), "reviews.")
			continue
		}

		var newReviews []models.Review
		now := time.Now().UTC().Format(time.RFC3339)
		for i := 0; i < needed; i++ {
			r := models.DefaultReview()
			r.MovieID = movie.ID
			// Random rating between 0.0 and 5.0 (one decimal place)
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

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		fmt.Println("Error loading .env file:", err)
		return
	}
	fmt.Println("Environment variables loaded successfully")

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		fmt.Println("MONGODB_URI environment variable not set")
		return
	}
	fmt.Println("MongoDB URI set successfully")

	db_name := os.Getenv("MONGODB_DB_NAME")
	if db_name == "" {
		fmt.Println("MONGODB_DB_NAME environment variable not set")
		return
	}
	fmt.Println("MongoDB DB_NAME set successfully")

	database.SetURI(uri)
	database.SetDBName(db_name)

	// Call the new function to ensure each of the 10 films has at least 3 reviews.
	ensureMovieReviews()
}
