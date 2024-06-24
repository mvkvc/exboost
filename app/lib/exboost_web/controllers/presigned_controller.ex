defmodule ExboostWeb.PresignedController do
  use ExboostWeb, :controller
  alias Exboost.S3

  def create(conn, %{"key" => key} = _params) do
    case S3.generate_presigned_url(key) do
      {:ok, presigned_url} ->
        handle_success(conn, presigned_url)
      {:error, error} ->
        handle_error(conn, error)
    end
  end

  def create(conn, _params) do
    handle_error(conn, "key is required")
  end

  defp handle_success(conn, presigned_url) do
    conn
    |> put_status(:ok)
    |> json(%{url: presigned_url})
  end

  defp handle_error(conn, error) do
    conn
    |> put_status(:bad_request)
    |> json(%{message: error})
  end
end
