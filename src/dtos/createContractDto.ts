interface CreateContract {
    body: {
      title: string;
      description: string;
      userId: string;
      templateId: string;
    };
  }
  
export default CreateContract;