class CreateJobs < ActiveRecord::Migration[8.0]
  def change
    create_table :jobs do |t|
      t.string :company, null: false
      t.string :position, null: false
      t.string :job_url
      t.string :status, null: false
      t.string :salary
      t.string :location
      t.text :stack
      t.datetime :applied_date
      t.text :notes

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end