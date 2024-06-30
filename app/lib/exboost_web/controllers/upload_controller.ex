defmodule ExboostWeb.UploadController do
  use ExboostWeb, :controller
  alias Exboost.S3

  def presigned(conn, %{"key" => key} = _params) do
    case S3.generate_presigned_url(key) do
      {:ok, presigned_url} ->
        conn
        |> put_status(:ok)
        |> json(%{url: presigned_url})

      {:error, error} ->
        conn
        |> put_status(:bad_request)
        |> json(%{message: error})
    end
  end

  def create(conn, _params) do
  end

  def delete(conn, _params) do
  end
end
