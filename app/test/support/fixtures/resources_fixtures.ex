defmodule Exboost.ResourcesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Exboost.Resources` context.
  """

  @doc """
  Generate a resource.
  """
  def resource_fixture(attrs \\ %{}) do
    {:ok, resource} =
      attrs
      |> Enum.into(%{
        type: "some type",
        url: "some url"
      })
      |> Exboost.Resources.create_resource()

    resource
  end

  @doc """
  Generate a chunk.
  """
  def chunk_fixture(attrs \\ %{}) do
    {:ok, chunk} =
      attrs
      |> Enum.into(%{

      })
      |> Exboost.Resources.create_chunk()

    chunk
  end
end
