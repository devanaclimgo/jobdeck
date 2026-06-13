class ApplicationController < ActionController::API
  include ActionController::Cookies

  respond_to :json
end