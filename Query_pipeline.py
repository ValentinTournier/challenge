import os
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, get_response_synthesizer, StorageContext, load_index_from_storage
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.llms.mistralai import MistralAI
from llama_index.embeddings.mistralai import MistralAIEmbedding
from OutPutParsing import OutputFormat_CCAM
from llama_index.core import PromptTemplate
from llama_index.core.chat_engine import CondenseQuestionChatEngine
from llama_index.core import PromptTemplate
from llama_index.core.chat_engine import CondenseQuestionChatEngine

# Load environment variables
load_dotenv()

# Initialize API key for Mistral
api_key_mistral = os.getenv("MISTRAL_API_KEY1")
print("API Key Mistral:", api_key_mistral)

# Initialize the MistralAIEmbedding and MistralAI
embed_model = MistralAIEmbedding(model_name="mistral-embed", api_key=api_key_mistral)
llm = MistralAI(api_key=api_key_mistral, model="open-mixtral-8x7b")
embed_model='local'

# Function to create or load an index
def create_or_load_index(storage_path, datafolder):
    """
    Create or load a VectorStoreIndex from a specified storage path and data folder.
    """
    index_files_exist = any(fname.endswith('.json') for fname in os.listdir(storage_path)) if os.path.exists(storage_path) else False
    
    if index_files_exist:
        storage_context = StorageContext.from_defaults(persist_dir=storage_path)
        index = load_index_from_storage(storage_context)
        print("Index loaded from storage.")
    else:
        documents = SimpleDirectoryReader(datafolder, recursive=True).load_data()
        index = VectorStoreIndex.from_documents(documents=documents, show_progress=True)
        index.storage_context.persist(persist_dir=storage_path)
        print("Index created and stored.")
    
    return index

# Load indices for CCAM and CIM
index_CCAM = create_or_load_index("storage_CCAM", "data_CCAM")
#index_CIM = create_or_load_index("Storage_CIM", "data_CIM")

# Set up vector retrievers and query engines for CCAM
vector_retriever_CCAM = VectorIndexRetriever(index=index_CCAM, similarity_top_k=1)
response_synthesizer_CCAM = get_response_synthesizer(output_cls=OutputFormat_CCAM)
vector_query_engine_CCAM = RetrieverQueryEngine(
    retriever=vector_retriever_CCAM,
    response_synthesizer=response_synthesizer_CCAM,
)
#vector_retriever_CCAM_prix = VectorIndexRetriever(index=index_CCAM, similarity_top_k=1)
#response_synthesizer_CCAM_prix = get_response_synthesizer(output_cls=OutputFormat_CCAM)
#vector_query_engine_CCAM = RetrieverQueryEngine(
#    retriever=vector_retriever_CCAM,
#    response_synthesizer=response_synthesizer_CCAM,
 #)

response_synthesizer = get_response_synthesizer()
vector_query_engine = RetrieverQueryEngine(
    retriever=vector_retriever_CCAM,
    response_synthesizer=response_synthesizer,
)

# Set up vector retriever and query engine for CIM
#vector_retriever_CIM = VectorIndexRetriever(index=index_CIM, similarity_top_k=2, verbose=True)
#response_synthesizer_CIM = get_response_synthesizer(output_cls=OutputFormat_CIM)
#vector_query_engine_CIM = RetrieverQueryEngine(
#    retriever=vector_retriever_CIM,
#    response_synthesizer=response_synthesizer_CIM,
#)

# Initialize query engine for chat
query_engine = index_CCAM.as_chat_engine()

# Function to extract treatments using LlamaIndex
def extract_treatments_with_llamaindex(query, query_engine):
    """
    Extract treatments or medical acts from the given query using a chat engine with LlamaIndex.
    """
    prompt_template = PromptTemplate(
        """\
        Identifie tous les traitements ou actes médicaux mentionnés dans le texte suivant et renvoie leur intitulé sous forme de liste :
        
        Texte : "{text}"
        
        Réponds uniquement avec les intitulés des traitements ou actes trouvés, séparés par des virgules et en francais.
        """
    )

    chat_engine = CondenseQuestionChatEngine.from_defaults(
        query_engine=query_engine,
        condense_question_prompt=prompt_template,
        chat_history=[],
        verbose=True
    )

    # Extract treatments from query
    response = chat_engine.chat(query + " écris bien en francais")
    treatments = response.response.split(",")
    treatments = [treatment.strip() for treatment in treatments]

    return treatments

def chat(query):
    final_answer=[]
    resp_dic= vector_query_engine_CCAM.query(query)
    final_answer.append(resp_dic.price)
    final_answer.append(resp_dic.Traitement_Code)
    final_answer.append("Description: "+str(resp_dic.Traitement)+ "; Code: "+str(resp_dic.Traitement_Code) +"; Prix: "+ str(resp_dic.price))
    print(final_answer)
    return(final_answer)

chat("patient cirrhose de foie")
del embed_model
del llm


