defmodule Agents.Rooms do
  use Agent

  @type room_list() :: list(Room.t())

  def start_link(initial_value) do
    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  @spec value :: list(Room.t())
  def value do
    Agent.get(__MODULE__, & &1)
  end

  @spec set_free(number()) :: :ok
  def set_free(index) do
    Agent.update(__MODULE__, fn state -> set_room_state(state, index, false) end)
  end

  @spec set_busy(number()) :: :ok
  def set_busy(index) do
    Agent.update(__MODULE__, fn state -> set_room_state(state, index, true) end)
  end

  @spec set_room_state(state :: room_list(), index :: number(), busy :: boolean()) :: room_list()
  defp set_room_state(state, index, busy) do
    List.update_at(state, index, fn elem -> %Room{name: elem.name, busy: busy} end)
  end
end
