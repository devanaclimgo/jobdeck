Rails.application.routes.draw do
devise_for :users,
  path: "",
  path_names: {
    sign_in: "signin",
    sign_out: "logout",
    registration: "signup"
  },

  controllers: {
    sessions: "api/v1/sessions",
    registrations: "api/v1/registrations"
  }

  namespace :api do
    namespace :v1 do
      get :me, to: 'users#me'
    end
  end

  match "*path", via: [:options], to: proc {
    [200, {
      "Access-Control-Allow-Origin" => ENV.fetch("FRONTEND_URL", "*"),
      "Access-Control-Allow-Methods" => "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" => "Origin, Content-Type, Accept, Authorization",
    }, [""]]
  }
end
