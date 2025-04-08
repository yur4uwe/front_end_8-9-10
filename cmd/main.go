package main

import (
	"fmt"
	"movie_theater/pkg/handlers"
	"movie_theater/pkg/middleware"
	"net/http"
	"os"
	"os/signal"

	"github.com/joho/godotenv"
)

func main() {

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

	fs := http.FileServer(http.Dir("../frontend/build"))
	assets := http.FileServer(http.Dir("../frontend/src/assets"))

	router := http.NewServeMux()
	router.Handle("/", fs)
	router.Handle("/assets/", http.StripPrefix("/assets/", assets))
	router.HandleFunc("/api/hello", handlers.HelloWorldHandler)
	router.HandleFunc("/api/v1/movies", handlers.GetMoviesHandler)

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
