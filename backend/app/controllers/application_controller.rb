class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::Flash

  respond_to :json
end