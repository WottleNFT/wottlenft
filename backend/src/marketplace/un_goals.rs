use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum UnGoal {
    ClimateAction,
    ZeroHunger,
    QualityEducation,
}
