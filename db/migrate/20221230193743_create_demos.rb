class CreateDemos < ActiveRecord::Migration[7.0]
  def change
    create_table :demos do |t|
      t.string :title
      t.text :desc
      t.text :path

      t.timestamps
    end
  end
end
