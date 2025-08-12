import { http, HttpResponse } from 'msw';

export const jobApplicationHandler = http.post(
  '/api/job/application',
  async ({ request }) => {
    // Parse multipart/form-data
    const formData = await request.formData();

    console.log('Form data >>>>', formData);

    // Basic server-side validation mock
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'resume',
      'coverLetter',
    ];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return HttpResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    return HttpResponse.json(
      {
        message: 'Application submitted successfully',
        application: Object.fromEntries(formData),
      },
      { status: 201 }
    );
  }
);
