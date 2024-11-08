from llama_index.core.bridge .pydantic import BaseModel, Field
from llama_index.core.bridge import BaseModel, Field


class OutputFormat_CCAM(BaseModel):
    """
    Modèle pour formater les informations de tarification CCAM.
    """
    price: float = Field(..., description="Valeur numérique représentant le coût du traitement en float.")
    Traitement_Code: str = Field(..., description="Code unique associé au traitement.")
    Traitement: str = Field(..., description="Description textuelle associée au traitement")

class OutputFormat_CIM(BaseModel):
    """
    Modèle pour formater les informations associées à une maladie CIM.
    """
    Maladie: str = Field(..., description="Description textuelle de la maladie.")
    Maladie_Code: str = Field(..., description="Code unique associé à la maladie.")


class Number(BaseModel):
    """
    Modèle pour donner le prix finales des traitements recus
    
    """
    Prix: float = Field(...,description="Il faut que tu sommes les prix des différents traitements trouvés")
    