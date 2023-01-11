Rails.application.routes.draw do
  get "demos", to: "demos#index"
  get "demos/:id", to: "demos#show"
  get "javascript/:path", to: "demos#index"

  resources :demos
end
