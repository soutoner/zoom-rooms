defmodule BackendWeb.RoomChannel do
  use BackendWeb, :channel

  @impl true
  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in("read_rooms", _payload, socket) do
    {:reply, {:ok, Rooms.value()}, socket}
  end
end
