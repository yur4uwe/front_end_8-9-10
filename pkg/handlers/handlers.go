package handlers

import (
	"fmt"
	"net/http"
)

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	logBuffer := r.Context().Value("logBuffer").([]byte)
	if logBuffer != nil {
		fmt.Println("Log buffer found in context")
		logBuffer = append(logBuffer, []byte("Hello, World!\n")...)
	} else {
		fmt.Println("No log buffer found in context")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "Hello, World!"}`))
}
