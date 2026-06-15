class Job < ApplicationRecord
  belongs_to :user

  add_column :jobs, :stack, :string, array: true, default: []

  validates :company, :position, :status, presence: true
end