package handlers

import (
	"cine-spot/pkg/database"
	"cine-spot/pkg/models"
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

func GetScreeningsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	queries := r.URL.Query()
	screeningID := queries.Get("screeningId")
	if screeningID == "" {
		fmt.Println("Error: missing 'screeningId' query parameter")
		http.Error(w, "missing 'screeningId' query parameter", http.StatusBadRequest)
		return
	}
	screeningRepo, cleanup, err := models.ScreeningRepo()
	if err != nil {
		fmt.Println("Error getting screening repository:", err)
		http.Error(w, "Error getting screening repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	objectID, err := database.ObjectId(screeningID)
	if err != nil {
		fmt.Println("Error converting screening_id to ObjectID:", err)
		http.Error(w, "Invalid screening ID", http.StatusBadRequest)
		return
	}

	screening, err := screeningRepo.FindOne(ctx, bson.D{{Key: "_id", Value: objectID}})
	if err != nil {
		fmt.Println("Failed to get screening seating plan:", err)
		http.Error(w, "Failed to get screening seating plan", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(screening)
}

func GetScreeningSeatsHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	queries := r.URL.Query()
	screeningID := queries.Get("screeningId")
	if screeningID == "" {
		fmt.Println("Error: missing 'screeningId' query parameter")
		http.Error(w, "missing 'screeningId' query parameter", http.StatusBadRequest)
		return
	}
	screeningRepo, cleanup, err := models.ScreeningRepo()
	if err != nil {
		fmt.Println("Error getting screening repository:", err)
		http.Error(w, "Error getting screening repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	objectID, err := database.ObjectId(screeningID)
	if err != nil {
		fmt.Println("Error converting screening_id to ObjectID:", err)
		http.Error(w, "Invalid screening ID", http.StatusBadRequest)
		return
	}

	screening, err := screeningRepo.FindOne(ctx, bson.D{{Key: "_id", Value: objectID}})
	if err != nil {
		fmt.Println("Failed to get screening seating plan:", err)
		http.Error(w, "Failed to get screening seating plan", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(screening)
}
