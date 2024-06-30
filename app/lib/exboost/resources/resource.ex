defmodule Exboost.Resources.Resource do
  use Ecto.Schema
  import Ecto.Changeset

  schema "resources" do
    field :type, :string
    field :url, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(resource, attrs) do
    resource
    |> cast(attrs, [:url, :type])
    |> validate_required([:url, :type])
  end
end
