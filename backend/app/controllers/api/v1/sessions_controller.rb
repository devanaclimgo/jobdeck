class Api::V1::SessionsController < Devise::SessionsController  
  respond_to :json
  skip_before_action :require_no_authentication, only: [:create]
  
  private

  def respond_with(resource, _opts = {})

    if resource.persisted?
      render json: {
        message: 'Logged in successfully',
        user: resource,
      }, status: :ok
    else
      render json: {
        error: 'Invalid email/name or password'
      }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    render json: { message: 'Logged out successfully' }, status: :ok
  end
end
