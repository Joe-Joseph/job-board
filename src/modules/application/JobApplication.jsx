import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SquareUser, Mail, MapPin, Link, CheckCircle } from 'lucide-react';

import { TopBar } from '../../components/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDetails } from '../../store/slice/jobDetailsSlice';
import { InputField } from '../../components/InputField';
import { UploadFile } from '../../components/UploadFile';
import { useFormik } from 'formik';
import {
  initialValues,
  validationSchema,
} from '../jobs/forms/jobApplicationConfig';
import { PageError } from '../../components/PageError';
import {
  clearApplicationState,
  submitJobApplication,
} from '../../store/slice/jobApplication';
import { JobApplicationSubmissionSuccess } from './jobApplication/JobSubmissionSucess';
import { ApplicationFormSectionTitle } from './jobApplication/ApplicationFormSectionTitle';
import { JobApplicationHeader } from './jobApplication/JobApplicationHeader';

export const JobApplication = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const selectedJobId = Number(jobId);

  const {
    job,
    loading: loadingJobDetails,
    error,
  } = useSelector((state) => state.jobDetails);
  const {
    loading: submittingApplication,
    error: jobApplicationError,
    successMessage,
  } = useSelector((state) => state.jobApplication);

  useEffect(() => {
    if (!job || Number(job.id) !== selectedJobId) {
      dispatch(fetchJobDetails(selectedJobId));
    }
  }, [dispatch, selectedJobId, job]);

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    formik.setFieldValue(fieldName, file);
  };

  const handleDrop = (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    formik.setFieldValue(fieldName, file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      Object.keys(values).forEach((key) => {
        data.append(key, values[key]);
      });

      dispatch(clearApplicationState());

      try {
        await dispatch(submitJobApplication(data)).unwrap();
      } catch (error) {
        console.log('Error while submitting the application', error);
      }
    },
  });

  return (
    <div className="min-h-screen px-5 pb-5 bg-gray-50 dark:bg-gray-900">
      <TopBar />
      {!loadingJobDetails && error ? (
        <div className="flex items-center justify-center min-h-screen">
          <PageError error={error} />
        </div>
      ) : (
        <div className="max-w-4xl pb-5 mx-auto pt-22">
          {/* Header */}
          <JobApplicationHeader job={job} />

          {jobApplicationError ? (
            <div className="p-8 text-center text-gray-600 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-900 dark:border dark:border-gray-800">
              {jobApplicationError}
            </div>
          ) : successMessage ? (
            // Success Message
            <JobApplicationSubmissionSuccess job={job} />
          ) : (
            // Application Form
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
                <ApplicationFormSectionTitle title={'Personal Information'} />
                <div className="grid grid-cols-1 gap-x-6 gap-y-1 md:grid-cols-2">
                  {/* First Name Field */}
                  <InputField
                    icon={SquareUser}
                    type="text"
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    label={'First Name'}
                    name="firstName"
                    error={formik.touched.firstName && formik.errors.firstName}
                    onBlur={formik.handleBlur}
                  />

                  {/* Last Name Field */}
                  <InputField
                    icon={SquareUser}
                    type="text"
                    placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    label={'Last Name'}
                    name="lastName"
                    error={formik.touched.lastName && formik.errors.lastName}
                    onBlur={formik.handleBlur}
                  />

                  {/* Email Field */}
                  <InputField
                    icon={Mail}
                    type="text"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    label={'Email'}
                    name="email"
                    error={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                  />

                  <InputField
                    icon={MapPin}
                    type="text"
                    placeholder="Current Location"
                    value={formik.values.currentLocation}
                    onChange={formik.handleChange}
                    label={'Current Location'}
                    name="currentLocation"
                    error={
                      formik.touched.currentLocation &&
                      formik.errors.currentLocation
                    }
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              {/* Links & Portfolio */}
              <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
                <ApplicationFormSectionTitle title={'Professional Links'} />

                <div className="grid grid-cols-1 gap-x-6 gap-y-1 md:grid-cols-2">
                  <InputField
                    icon={Link}
                    type="text"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formik.values.linkedinProfile}
                    onChange={formik.handleChange}
                    label={'Linkedin Profile (Optional)'}
                    name="linkedinProfile"
                    error={
                      formik.touched.linkedinProfile &&
                      formik.errors.linkedinProfile
                    }
                    onBlur={formik.handleBlur}
                  />

                  <InputField
                    icon={Link}
                    type="text"
                    placeholder="https://yourportfolio.com"
                    value={formik.values.portfolio}
                    onChange={formik.handleChange}
                    label={'Portfolio Website (Optional)'}
                    name="portfolio"
                    error={formik.touched.portfolio && formik.errors.portfolio}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
                <ApplicationFormSectionTitle title={'Documents'} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <UploadFile
                    labelText={'Resume/CV'}
                    handleDrop={handleDrop}
                    name={'resume'}
                    handleDragOver={handleDragOver}
                    handleFileChange={handleFileChange}
                    file={formik.values.resume}
                    error={formik.touched.resume && formik.errors.resume}
                    onBlur={() => formik.setFieldTouched('resume', true)}
                    formik={formik}
                  />

                  <UploadFile
                    labelText={'Cover Letter'}
                    handleDrop={handleDrop}
                    name={'coverLetter'}
                    handleDragOver={handleDragOver}
                    handleFileChange={handleFileChange}
                    file={formik.values.coverLetter}
                    error={
                      formik.touched.coverLetter && formik.errors.coverLetter
                    }
                    onBlur={() => formik.setFieldTouched('coverLetter', true)}
                    formik={formik}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:border dark:border-gray-800">
                <div className="flex flex-col items-center justify-between">
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    By submitting this application, you agree to our Terms of
                    Service and Privacy Policy.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-5 space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="w-full py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 md:w-52 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full py-2 text-sm font-medium text-white transition-colors bg-gray-800 rounded-md cursor-pointer md:w-52 hover:bg-black"
                    >
                      Submit Application
                      {submittingApplication ? (
                        <svg
                          class="mr-3 size-5 animate-spin text-white"
                          viewBox="0 0 24 24"
                        ></svg>
                      ) : null}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
