defmodule Exboost.Repo.Migrations.CreateResources do
  use Ecto.Migration

  def change do
    create table(:resources) do
      add :url, :string
      add :type, :string

      timestamps(type: :utc_datetime)
    end
  end
end
