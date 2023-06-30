defmodule BackendWeb.HomeController do
  use BackendWeb, :controller

  def index(conn, _params) do
    text(conn, "Hello!")
  end
end
