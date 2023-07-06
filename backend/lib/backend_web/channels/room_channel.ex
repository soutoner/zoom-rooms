defmodule BackendWeb.RoomChannel do
  use BackendWeb, :channel
  alias Agents.Rooms, as: RoomsAgent

  @impl true
  def join("room:lobby", _payload, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_in("read_rooms", _payload, socket) do
    {:reply, {:ok, RoomsAgent.value()}, socket}
  end

  def handle_in("set_busy", %{"index" => index}, socket) do
    RoomsAgent.set_busy(index)
    broadcast!(socket, "is_busy", %{"index" => index})
    {:noreply, socket}
  end

  def handle_in("set_free", %{"index" => index}, socket) do
    RoomsAgent.set_free(index)
    broadcast!(socket, "is_free", %{"index" => index})
    {:noreply, socket}
  end
end
