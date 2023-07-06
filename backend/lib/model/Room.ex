defmodule Room do
  @moduledoc """
  Represent a given room. A room has a `name`, and a `busy` flag
  holding whether the room is occupied or not.
  """

  @derive {Jason.Encoder, only: [:name, :busy]}
  defstruct [:name, busy: false]

  @type t :: %__MODULE__{
          name: String.t() | nil,
          busy: boolean()
        }
end
