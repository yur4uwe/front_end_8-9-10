package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
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

func Get(collection *mongo.Collection, filter bson.D, ctx context.Context, limit int) ([]map[string]interface{}, error) {
	cursor, err := collection.Find(ctx, bson.D{}, options.Find().SetLimit(int64(limit)))
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	if !cursor.Next(ctx) {
		return nil, err
	}

	var documents []map[string]interface{}
	if err := cursor.All(ctx, &documents); err != nil {
		return nil, err
	}

	return documents, nil
}

func GetOne(collection *mongo.Collection, filter bson.D, ctx context.Context) (map[string]interface{}, error) {
	var result map[string]interface{}
	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func GetById(collection *mongo.Collection, id string, ctx context.Context) (map[string]interface{}, error) {
	filter := bson.D{{Key: "_id", Value: id}}
	return GetOne(collection, filter, ctx)
}
func ObjectId(id string) (primitive.ObjectID, error) {
	return primitive.ObjectIDFromHex(id)
}
