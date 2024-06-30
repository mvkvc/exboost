defmodule Exboost.Repo.Migrations.CreateChunks do
  use Ecto.Migration

  def change do
    create table(:chunks) do
      add :resource_id, references(:resources, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:chunks, [:resource_id])
  end
end
