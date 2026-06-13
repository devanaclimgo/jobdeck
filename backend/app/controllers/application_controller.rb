class ApplicationController < ActionController::API
  before_action if: :devise_controller?

  protected
end