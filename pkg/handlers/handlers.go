package handlers

import (
	"encoding/json"
	"net/http"
)

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Hello, World!"})
}

func GetMoviesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode([]map[string]string{
		{
			"id": "1", "title": "Inception", "genre": "Sci-Fi",
			"imageUrl": "https://m.media-amazon.com/images/I/71uKM+LdgFL._AC_UF894,1000_QL80_.jpg",
		},
		{
			"id": "2", "title": "The Dark Knight", "genre": "Action",
			"imageUrl": "https://m.media-amazon.com/images/I/A1exRxgHRRL.jpg",
		},
		{
			"id": "3", "title": "Interstellar", "genre": "Sci-Fi",
			"imageUrl": "https://m.media-amazon.com/images/I/71JC2qvPx5L._AC_UF894,1000_QL80_.jpg",
		},
	})
}
