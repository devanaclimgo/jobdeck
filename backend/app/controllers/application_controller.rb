class ApplicationController < ActionController::API
  before_action if: :devise_controller?

  include ActionController::Cookies
end