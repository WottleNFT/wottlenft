use backend::envconfig::Envconfig;
use backend::{config, error::Result, rest};

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();
    let config = config::Config::init_from_env().unwrap();
    rest::start_server(config).await?;
    Ok(())
}
