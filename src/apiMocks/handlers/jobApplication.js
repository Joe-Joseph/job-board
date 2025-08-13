import { http, HttpResponse } from 'msw';
import { withAuth } from '../../utils/withAuth';

export const jobApplicationHandler = http.post(
  '/api/job/application',
  withAuth(async ({ request }) => {
    const formData = await request.formData();

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
  })
);
