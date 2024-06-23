defmodule Exboost.Chats.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Exboost.Accounts.User
  alias Exboost.Chats.Chat

  schema "messages" do
    field :content, :string

    belongs_to :user, User
    belongs_to :chat, Chat

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:user_id, :chat_id, :content])
    |> validate_required([:chat_id, :content])
  end
end
