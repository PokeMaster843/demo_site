class DemosController < ApplicationController
  def index
    @demos = Demo.all
  end
  def show
    @demo = Demo.find(params[:id])
  end
end
