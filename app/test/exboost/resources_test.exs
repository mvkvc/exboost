defmodule Exboost.ResourcesTest do
  use Exboost.DataCase

  alias Exboost.Resources

  describe "resources" do
    alias Exboost.Resources.Resource

    import Exboost.ResourcesFixtures

    @invalid_attrs %{type: nil, url: nil}

    test "list_resources/0 returns all resources" do
      resource = resource_fixture()
      assert Resources.list_resources() == [resource]
    end

    test "get_resource!/1 returns the resource with given id" do
      resource = resource_fixture()
      assert Resources.get_resource!(resource.id) == resource
    end

    test "create_resource/1 with valid data creates a resource" do
      valid_attrs = %{type: "some type", url: "some url"}

      assert {:ok, %Resource{} = resource} = Resources.create_resource(valid_attrs)
      assert resource.type == "some type"
      assert resource.url == "some url"
    end

    test "create_resource/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Resources.create_resource(@invalid_attrs)
    end

    test "update_resource/2 with valid data updates the resource" do
      resource = resource_fixture()
      update_attrs = %{type: "some updated type", url: "some updated url"}

      assert {:ok, %Resource{} = resource} = Resources.update_resource(resource, update_attrs)
      assert resource.type == "some updated type"
      assert resource.url == "some updated url"
    end

    test "update_resource/2 with invalid data returns error changeset" do
      resource = resource_fixture()
      assert {:error, %Ecto.Changeset{}} = Resources.update_resource(resource, @invalid_attrs)
      assert resource == Resources.get_resource!(resource.id)
    end

    test "delete_resource/1 deletes the resource" do
      resource = resource_fixture()
      assert {:ok, %Resource{}} = Resources.delete_resource(resource)
      assert_raise Ecto.NoResultsError, fn -> Resources.get_resource!(resource.id) end
    end

    test "change_resource/1 returns a resource changeset" do
      resource = resource_fixture()
      assert %Ecto.Changeset{} = Resources.change_resource(resource)
    end
  end

  describe "chunks" do
    alias Exboost.Resources.Chunk

    import Exboost.ResourcesFixtures

    @invalid_attrs %{}

    test "list_chunks/0 returns all chunks" do
      chunk = chunk_fixture()
      assert Resources.list_chunks() == [chunk]
    end

    test "get_chunk!/1 returns the chunk with given id" do
      chunk = chunk_fixture()
      assert Resources.get_chunk!(chunk.id) == chunk
    end

    test "create_chunk/1 with valid data creates a chunk" do
      valid_attrs = %{}

      assert {:ok, %Chunk{} = chunk} = Resources.create_chunk(valid_attrs)
    end

    test "create_chunk/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Resources.create_chunk(@invalid_attrs)
    end

    test "update_chunk/2 with valid data updates the chunk" do
      chunk = chunk_fixture()
      update_attrs = %{}

      assert {:ok, %Chunk{} = chunk} = Resources.update_chunk(chunk, update_attrs)
    end

    test "update_chunk/2 with invalid data returns error changeset" do
      chunk = chunk_fixture()
      assert {:error, %Ecto.Changeset{}} = Resources.update_chunk(chunk, @invalid_attrs)
      assert chunk == Resources.get_chunk!(chunk.id)
    end

    test "delete_chunk/1 deletes the chunk" do
      chunk = chunk_fixture()
      assert {:ok, %Chunk{}} = Resources.delete_chunk(chunk)
      assert_raise Ecto.NoResultsError, fn -> Resources.get_chunk!(chunk.id) end
    end

    test "change_chunk/1 returns a chunk changeset" do
      chunk = chunk_fixture()
      assert %Ecto.Changeset{} = Resources.change_chunk(chunk)
    end
  end
end
