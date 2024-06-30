defmodule Exboost.Resources do
  @moduledoc """
  The Resources context.
  """

  import Ecto.Query, warn: false
  alias Exboost.Repo

  alias Exboost.Resources.Resource

  @doc """
  Returns the list of resources.

  ## Examples

      iex> list_resources()
      [%Resource{}, ...]

  """
  def list_resources do
    Repo.all(Resource)
  end

  @doc """
  Gets a single resource.

  Raises `Ecto.NoResultsError` if the Resource does not exist.

  ## Examples

      iex> get_resource!(123)
      %Resource{}

      iex> get_resource!(456)
      ** (Ecto.NoResultsError)

  """
  def get_resource!(id), do: Repo.get!(Resource, id)

  @doc """
  Creates a resource.

  ## Examples

      iex> create_resource(%{field: value})
      {:ok, %Resource{}}

      iex> create_resource(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_resource(attrs \\ %{}) do
    %Resource{}
    |> Resource.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a resource.

  ## Examples

      iex> update_resource(resource, %{field: new_value})
      {:ok, %Resource{}}

      iex> update_resource(resource, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_resource(%Resource{} = resource, attrs) do
    resource
    |> Resource.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a resource.

  ## Examples

      iex> delete_resource(resource)
      {:ok, %Resource{}}

      iex> delete_resource(resource)
      {:error, %Ecto.Changeset{}}

  """
  def delete_resource(%Resource{} = resource) do
    Repo.delete(resource)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking resource changes.

  ## Examples

      iex> change_resource(resource)
      %Ecto.Changeset{data: %Resource{}}

  """
  def change_resource(%Resource{} = resource, attrs \\ %{}) do
    Resource.changeset(resource, attrs)
  end

  alias Exboost.Resources.Chunk

  @doc """
  Returns the list of chunks.

  ## Examples

      iex> list_chunks()
      [%Chunk{}, ...]

  """
  def list_chunks do
    Repo.all(Chunk)
  end

  @doc """
  Gets a single chunk.

  Raises `Ecto.NoResultsError` if the Chunk does not exist.

  ## Examples

      iex> get_chunk!(123)
      %Chunk{}

      iex> get_chunk!(456)
      ** (Ecto.NoResultsError)

  """
  def get_chunk!(id), do: Repo.get!(Chunk, id)

  @doc """
  Creates a chunk.

  ## Examples

      iex> create_chunk(%{field: value})
      {:ok, %Chunk{}}

      iex> create_chunk(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_chunk(attrs \\ %{}) do
    %Chunk{}
    |> Chunk.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a chunk.

  ## Examples

      iex> update_chunk(chunk, %{field: new_value})
      {:ok, %Chunk{}}

      iex> update_chunk(chunk, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_chunk(%Chunk{} = chunk, attrs) do
    chunk
    |> Chunk.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a chunk.

  ## Examples

      iex> delete_chunk(chunk)
      {:ok, %Chunk{}}

      iex> delete_chunk(chunk)
      {:error, %Ecto.Changeset{}}

  """
  def delete_chunk(%Chunk{} = chunk) do
    Repo.delete(chunk)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking chunk changes.

  ## Examples

      iex> change_chunk(chunk)
      %Ecto.Changeset{data: %Chunk{}}

  """
  def change_chunk(%Chunk{} = chunk, attrs \\ %{}) do
    Chunk.changeset(chunk, attrs)
  end
end
