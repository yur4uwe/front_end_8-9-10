package repository

import (
	"cine-spot/pkg/database"
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository[T any] struct {
	Collection *mongo.Collection
}

func Repo[T any](name string) (*Repository[T], func(), error) {
	client, collection, cancel, err := database.ConnectTo(name)
	if err != nil {
		return &Repository[T]{}, nil, err
	}

	cleanup := func() {
		client.Disconnect(context.Background())
		cancel()
	}

	return &Repository[T]{Collection: collection}, cleanup, nil
}

// InsertOne inserts a document of type T into the collection.
func (r *Repository[T]) InsertOne(ctx context.Context, doc T) (primitive.ObjectID, error) {
	result, err := r.Collection.InsertOne(ctx, doc)
	if err != nil {
		return primitive.NilObjectID, err
	}
	oid, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return primitive.NilObjectID, errors.New("failed to convert to ObjectID")
	}
	return oid, nil
}

// InsertMany inserts multiple documents of type T into the collection.
func (r *Repository[T]) InsertMany(ctx context.Context, docs []T) ([]primitive.ObjectID, error) {
	documents := make([]interface{}, len(docs))
	for i, doc := range docs {
		documents[i] = doc
	}
	result, err := r.Collection.InsertMany(ctx, documents)
	if err != nil {
		return nil, err
	}
	var oids []primitive.ObjectID
	for _, id := range result.InsertedIDs {
		if oid, ok := id.(primitive.ObjectID); ok {
			oids = append(oids, oid)
		}
	}
	return oids, nil
}

// UpdateOne updates one document that matches the filter.
func (r *Repository[T]) UpdateOne(ctx context.Context, filter bson.D, update interface{}, opts ...*options.UpdateOptions) (int64, error) {
	result, err := r.Collection.UpdateOne(ctx, filter, update, opts...)
	if err != nil {
		return 0, err
	}
	return result.ModifiedCount, nil
}

// UpdateMany updates all documents that match the filter.
func (r *Repository[T]) UpdateMany(ctx context.Context, filter bson.D, update interface{}, opts ...*options.UpdateOptions) (int64, error) {
	result, err := r.Collection.UpdateMany(ctx, filter, update, opts...)
	if err != nil {
		return 0, err
	}
	return result.ModifiedCount, nil
}

// DeleteOne deletes one document that matches the filter.
func (r *Repository[T]) DeleteOne(ctx context.Context, filter bson.D) (int64, error) {
	result, err := r.Collection.DeleteOne(ctx, filter)
	if err != nil {
		return 0, err
	}
	return result.DeletedCount, nil
}

// DeleteMany deletes all documents that match the filter.
func (r *Repository[T]) DeleteMany(ctx context.Context, filter bson.D) (int64, error) {
	result, err := r.Collection.DeleteMany(ctx, filter)
	if err != nil {
		return 0, err
	}
	return result.DeletedCount, nil
}

// FindOne finds one document that matches the filter and decodes it into T.
func (r *Repository[T]) FindOne(ctx context.Context, filter bson.D) (T, error) {
	var result T
	err := r.Collection.FindOne(ctx, filter).Decode(&result)
	return result, err
}

// Find finds all documents that match the filter and decodes them into a slice of T.
func (r *Repository[T]) Find(ctx context.Context, filter bson.D, opts ...*options.FindOptions) ([]T, error) {
	cur, err := r.Collection.Find(ctx, filter, opts...)
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	var results []T
	for cur.Next(ctx) {
		var elem T
		if err := cur.Decode(&elem); err != nil {
			return nil, err
		}
		results = append(results, elem)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}
	return results, nil
}
