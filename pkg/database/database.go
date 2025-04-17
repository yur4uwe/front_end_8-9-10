package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	uri    string
	dbName string
)

func SetURI(newURI string) {
	uri = newURI
}

func SetDBName(newDBName string) {
	dbName = newDBName
}

// ConnectTo connects to MongoDB and returns the client, collection,
// a cancel function for the context, and an error if any.
func ConnectTo(collName string) (*mongo.Client, *mongo.Collection, context.CancelFunc, error) {
	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	// Create a new client and connect to the server
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		cancel() // cancel context if connection failed
		return nil, nil, nil, err
	}

	// Verify connection with a ping
	if err := client.Ping(ctx, nil); err != nil {
		client.Disconnect(ctx)
		cancel()
		return nil, nil, nil, err
	}

	// Get the specified collection
	collection := client.Database(dbName).Collection(collName)

	return client, collection, cancel, nil
}

func ObjectId(id string) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id)
}
