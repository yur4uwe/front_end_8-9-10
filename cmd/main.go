package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
)

func main() {
	fs := http.FileServer(http.Dir("../frontend/build"))

	handler := http.NewServeMux()
	handler.Handle("/", fs)

	exit := make(chan os.Signal, 1)
	signal.Notify(exit, os.Interrupt)

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
