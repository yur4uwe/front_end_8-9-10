package main

import (
	"fmt"
	"movie_theater/pkg/handlers"
	"movie_theater/pkg/middleware"
	"net/http"
	"os"
	"os/signal"
)

func main() {
	fs := http.FileServer(http.Dir("../frontend/build"))

	router := http.NewServeMux()
	router.Handle("/", fs)
	router.HandleFunc("/api/hello", handlers.HelloWorldHandler)

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
