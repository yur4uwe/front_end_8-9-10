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

	handlers := middleware.EnableCORS(middleware.Logging(router))

	server := &http.Server{
		Addr:    ":8080",
		Handler: handlers,
	}

	done := make(chan bool)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		fmt.Println("Shutting down server...")
		if err := server.Shutdown(nil); err != nil {
			fmt.Println("Error shutting down server:", err)
		}
		done <- true
	}()

	fmt.Println("Server started at http://localhost:8080")
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		fmt.Println("Error starting server:", err)
	}

	<-done
	fmt.Println("Server stopped")
}
