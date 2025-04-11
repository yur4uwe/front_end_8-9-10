package main

import (
	"cine-spot/pkg/database"
	"cine-spot/pkg/handlers"
	"cine-spot/pkg/middleware"
	"fmt"
	"net/http"
	"os"
	"os/signal"

	"github.com/joho/godotenv"
)

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

	fs := http.FileServer(http.Dir("../frontend/build"))
	assets := http.FileServer(http.Dir("../frontend/src/assets"))

	router := http.NewServeMux()
	router.Handle("/", fs)
	router.Handle("/assets/", http.StripPrefix("/assets/", assets))
	router.HandleFunc("/api/hello", handlers.HelloWorldHandler)
	router.HandleFunc("/api/v1/movies/short", handlers.GetMoviesHandler)
	router.HandleFunc("/api/v1/movie", handlers.GetMovieDetailsHandler)
	router.HandleFunc("/api/v1/movie/screenings", handlers.GetMoviesScreeningsHandler)
	router.HandleFunc("/api/v1/reviews", handlers.GetMovieReviewsHandler)
	router.HandleFunc("/api/v1/movie/book", handlers.GetScreeningSeatingPlanHandler)

	exit := make(chan os.Signal, 1)
	signal.Notify(exit, os.Interrupt)

	handler := middleware.Logging(router)
	handler = middleware.EnableCORS(handler)

	server := &http.Server{
		Addr:    ":8080",
		Handler: handler,
	}

	go func() {
		fmt.Println("Server started at http://localhost:8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Println("Error starting server:", err)
		}
	}()

	<-exit
	fmt.Println("Shutting down server...")

	if err := server.Close(); err != nil {
		fmt.Println("Error shutting down server:", err)
	} else {
		fmt.Println("Server gracefully stopped")
	}
}
