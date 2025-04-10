package models

// Seat represents seat types and prices in a screening per seat.
type Seat struct {
	ID        string  `bson:"_id,omitempty" json:"_id,omitempty"`
	Price     float32 `bson:"price" json:"price"`
	Type      string  `bson:"type" json:"type"`
	Row       int     `bson:"row" json:"row"`
	Number    int     `bson:"number" json:"number"`
	Available bool    `bson:"available" json:"available"`
}

type Screening struct {
	ID      string `bson:"_id,omitempty" json:"_id,omitempty"`
	MovieID string `bson:"movieId" json:"movieId"`
	Time    string `bson:"time" json:"time"`
	Seats   []Seat `bson:"seats" json:"seats"`
}
